package org.zabardast.blog.model;

import java.util.Date;
import java.util.List;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "posts", schema="blog")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id", nullable = false)
    private long id;

    @Column(name = "slug", nullable = false, unique = true, length = 512)
    private String slug;

    @Column(name = "title", nullable = false, length = 512)
    private String title;
  
    @Column(name = "text", nullable = false, columnDefinition="CLOB")
    private String text;

    @Column(name = "owner_id", nullable = false)
    private String owner;

    @Column(name = "created_on", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdOn;
  
    @Column(name = "updated_on", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedOn;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    List<Comment> comments;

    @ManyToMany
    @JoinTable(name = "posts_topics", schema = "blog",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "topic_id"))
    Set<Topic> topics;
}
