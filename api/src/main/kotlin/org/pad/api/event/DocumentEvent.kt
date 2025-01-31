package org.pad.api.event

import lombok.RequiredArgsConstructor
import lombok.extern.slf4j.Slf4j
import org.pad.api.domain.Document
import org.springframework.data.rest.core.annotation.HandleAfterCreate
import org.springframework.data.rest.core.annotation.HandleBeforeCreate
import org.springframework.data.rest.core.annotation.RepositoryEventHandler
import org.springframework.stereotype.Service

@Slf4j
@Service
@RepositoryEventHandler
@RequiredArgsConstructor
class DocumentEvent {

    @HandleBeforeCreate
    fun handleBeforeCreate(document: Document) {
        println("Handle Before Create")
    }

    @HandleAfterCreate
    fun handleAfterCreate(document: Document) {
        println("Handle After Create")
    }
}
