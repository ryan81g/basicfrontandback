package com.panoramic.rgallagher.basicfrontandback.model;

import javax.persistence.*;

@Entity
@Table(name="notes")
public class Note {

    /**
     * In production setting, since this would be specific to a user,
     * UUID would be better for adhering to OpenAPI standards.
     *
     * NOTE: It is important to note UUID's can affect index performance
     * if millions of rows are present as well.
     *
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "TITLE")
    private String title;
    @Column(name="DESCRIPTION")
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
