package com.panoramic.rgallagher.basicfrontandback.repository;

import com.panoramic.rgallagher.basicfrontandback.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * this exposes a bunch of functionality that we can use for paging,
 * sorting, etc.
 */

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

}
