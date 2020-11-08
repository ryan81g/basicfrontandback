package com.panoramic.rgallagher.basicfrontandback.service;

import com.panoramic.rgallagher.basicfrontandback.model.Note;
import com.panoramic.rgallagher.basicfrontandback.repository.NoteRepository;
import com.panoramic.rgallagher.basicfrontandback.util.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public List<Note> findAll(){
        return noteRepository.findAll();
    }

    public Note saveNote(Note note){
        return noteRepository.save(note);
    }

    public void deleteNote(Long id){
        noteRepository.deleteById(id);
    }

    public Note findNoteById(Long id){
        return noteRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public boolean noteExists(Long id){
        return noteRepository.existsById(id);
    }

}



