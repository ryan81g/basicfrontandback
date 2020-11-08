package com.panoramic.rgallagher.basicfrontandback.controller;

import com.panoramic.rgallagher.basicfrontandback.model.Note;
import com.panoramic.rgallagher.basicfrontandback.repository.NoteRepository;
import com.panoramic.rgallagher.basicfrontandback.service.NoteService;
import com.panoramic.rgallagher.basicfrontandback.util.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.io.NotActiveException;
import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

/**
 * If I had some more time I would have liked to implement the OOB paging
 * and sorting implementation that JPA provides.
 */

// TODO add some error handling
@RestController
public class NotesController {

    @Autowired
    private NoteService noteService;

    @GetMapping("/api/notes")
    public CollectionModel<Note> allNotes(){
        List<Note> notes = noteService.findAll();
        for(final Note note: notes){
            note.add(linkTo(methodOn(NotesController.class)
                    .singleNoteById(note.getId())).withSelfRel());
        }
        return CollectionModel.of(notes);
    }

    @GetMapping("/api/notes/{id}")
    public EntityModel<Note> singleNoteById(@PathVariable("id") Long id) {
        Note note = noteService.findNoteById(id);
        note.add(linkTo(methodOn(NotesController.class)
                .singleNoteById(id)).withSelfRel());
        return EntityModel.of(note);
    }

    @PostMapping("/api/saveNote")
    public EntityModel<Note> saveNote(@RequestBody Note note){
        Note created = noteService.saveNote(note);
        created.add(linkTo(methodOn(NotesController.class)
                .singleNoteById(created.getId())).withSelfRel());
        return EntityModel.of(created);
    }

    @DeleteMapping("/api/deleteNote/{id}")
    public void deleteNote(@PathVariable("id") Long id){
        if(!noteService.noteExists(id)) throw new NotFoundException();
        noteService.deleteNote(id);
    }

}
