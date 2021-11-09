package org.zabardast.common.filtering;

import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.query.QueryUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class FilterPredicateConverter
{
    public <T> CriteriaQuery<T> buildCriteriaQuery(EntityManager entityManager, Class<T> type, Filter filter, Sort sort)
            throws InvalidFilterException
    {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<T> query = builder.createQuery(type);
        Root<T> root = query.from(type);
        if(sort != null) {
            query.orderBy(QueryUtils.toOrders(sort, root, builder));
        }
        return query.where(buildFilterPredicate(builder, root, filter));
    }

    public <T> Predicate buildPredicate(EntityManager entityManager, Class<T> type, Filter filter)
            throws InvalidFilterException
    {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<T> query = builder.createQuery(type);
        Root<T> root = query.from(type);
        return buildFilterPredicate(builder, root, filter);
    }

    <T> Predicate buildFilterPredicate(CriteriaBuilder builder, Root<T> root, Filter filter)
            throws InvalidFilterException
    {
        List<Predicate> predicates = filter.conditions.stream().map(e -> {
            try
            {
                if(e instanceof Filter)
                    return buildFilterPredicate(builder, root, (Filter)e);
                return buildConditionPredicate(builder, root, (Condition) e);
            } catch (Exception exception) {
                throw new RuntimeException(exception.getMessage());
            }
        }).collect(Collectors.toList());

        if(filter.getType() == FilterType.OR)
            return builder.or(predicates.toArray(new Predicate[0]));

        return builder.and(predicates.toArray(new Predicate[0]));
    }

    <Y> Path<Y> resolve(Root<?> root, String attribute) {
        String[] segments = attribute.split("\\.");
        Path<Y> path = root.get(segments[0]);
        for (int i=1; i<segments.length; i++) {
            path = path.get(segments[i]);
        }
        return path;
    }

    <T> Predicate buildConditionPredicate(CriteriaBuilder builder, Root<T> root, Condition condition)
            throws InvalidFilterException
    {

        if(!StringUtils.hasText(condition.getAttribute()))
            throw new IllegalArgumentException("condition must not have empty attribute");

        Expression<String> attr = resolve(root, condition.getAttribute());
        switch(condition.getOperator()) {
            case EQ:
                return builder.equal(attr, condition.getValue());
            case IEQ:
                return builder.equal(builder.lower(attr), condition.getValue().toLowerCase());
            case NEQ:
                return builder.notEqual(attr, condition.getValue());
            case NIEQ:
                return builder.notEqual(builder.lower(attr), condition.getValue().toLowerCase());
            case LT:
                return builder.lessThan(attr, condition.getValue());
            case LTE:
                return builder.lessThanOrEqualTo(attr, condition.getValue());
            case GT:
                return builder.greaterThan(attr, condition.getValue());
            case GTE:
                return builder.greaterThanOrEqualTo(attr, condition.getValue());
            case LIKE:
                return builder.like(attr, condition.getValue());
            case ILIKE:
                return builder.like(builder.lower(attr), condition.getValue().toLowerCase());
            case NOT_LIKE:
                return builder.notLike(attr, condition.getValue());
            case NOT_ILIKE:
                return builder.notLike(builder.lower(attr), condition.getValue().toLowerCase());
            case NULL:
                return builder.isNull(attr);
            case NOT_NULL:
                return builder.isNotNull(attr);
            case BETWEEN:
                if(condition.getValues() == null || condition.getValues().size() != 2)
                    throw new IllegalArgumentException("between operator must have exactly two values");
                return builder.between(attr,
                        condition.getValues().get(0),
                        condition.getValues().get(1));
            case IN:
                if(condition.getValues() == null || condition.getValues().size() == 0)
                    throw new IllegalArgumentException("between operator must have exactly two values");
                return attr.in(condition.getValues());
            case NOT_IN:
                if(condition.getValues() == null || condition.getValues().size() == 0)
                    throw new IllegalArgumentException("between operator must have exactly two values");
                return builder.not(attr.in(condition.getValues()));
        }

        throw new InvalidFilterException("Unrecognized operator " + condition.getOperator());
    }
}
