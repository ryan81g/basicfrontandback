package com.panoramic.rgallagher.basicfrontandback.controller;

import com.panoramic.rgallagher.basicfrontandback.model.Note;
import com.panoramic.rgallagher.basicfrontandback.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * If I had some more time I would have liked to implement the OOB paging
 * and sorting implementation that JPA provides.
 */

// TODO add some error handling
@RestController
public class NotesController {

    @Autowired
    private NoteRepository notesRepository;

    @GetMapping("/api/notes")
    public CollectionModel<Note> allNotes(){
        return CollectionModel.of(notesRepository.findAll());
    }

    @GetMapping("/api/notes/{id}")
    public EntityModel<Note> singleNoteById(@PathVariable("id") Long id){
        Optional<Note> note = notesRepository.findById(id);
        return EntityModel.of(note.get());
    }

    @PostMapping("/api/saveNote")
    public EntityModel<Note> saveNote(@RequestBody Note note){
        return EntityModel.of(notesRepository.save(note));
    }

    @DeleteMapping("/api/deleteNote/{id}")
    public void deleteNote(@PathVariable("id") Long id){
        notesRepository.deleteById(id);
    }

}
