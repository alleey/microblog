package org.zabardast.common.filtering;

import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
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

    <T> Predicate buildConditionPredicate(CriteriaBuilder builder, Root<T> root, Condition condition)
            throws InvalidFilterException
    {

        if(!StringUtils.hasText(condition.getAttribute()))
            throw new IllegalArgumentException("condition must not have empty attribute");

        switch(condition.getOperator()) {
            case EQ:
                return builder.equal(root.get(condition.getAttribute()), condition.getValue());
            case NEQ:
                return builder.notEqual(root.get(condition.getAttribute()), condition.getValue());
            case LT:
                return builder.lessThan(root.get(condition.getAttribute()), condition.getValue());
            case LTE:
                return builder.lessThanOrEqualTo(root.get(condition.getAttribute()), condition.getValue());
            case GT:
                return builder.greaterThan(root.get(condition.getAttribute()), condition.getValue());
            case GTE:
                return builder.greaterThanOrEqualTo(root.get(condition.getAttribute()), condition.getValue());
            case LIKE:
                return builder.like(root.get(condition.getAttribute()), condition.getValue());
            case NOT_LIKE:
                return builder.notLike(root.get(condition.getAttribute()), condition.getValue());
            case NULL:
                return builder.isNull(root.get(condition.getAttribute()));
            case NOT_NULL:
                return builder.isNotNull(root.get(condition.getAttribute()));
            case BETWEEN:
                if(condition.getValues() == null || condition.getValues().size() != 2)
                    throw new IllegalArgumentException("between operator must have exactly two values");
                return builder.between(root.get(condition.getAttribute()),
                        condition.getValues().get(0),
                        condition.getValues().get(1));
            case IN:
                if(condition.getValues() == null || condition.getValues().size() == 0)
                    throw new IllegalArgumentException("between operator must have exactly two values");
                return root.get(condition.getAttribute()).in(condition.getValues());
            case NOT_IN:
                if(condition.getValues() == null || condition.getValues().size() == 0)
                    throw new IllegalArgumentException("between operator must have exactly two values");
                return builder.not(root.get(condition.getAttribute()).in(condition.getValues()));
        }

        throw new InvalidFilterException("Unrecognized operator " + condition.getOperator());
    }
}
