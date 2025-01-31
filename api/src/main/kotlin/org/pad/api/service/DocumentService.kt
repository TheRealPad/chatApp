package org.pad.api.service

import org.pad.api.domain.Document
import org.pad.api.repository.DocumentRepository
import org.springframework.stereotype.Service
import org.springframework.beans.factory.annotation.Autowired

@Service
class DocumentService {

    @Autowired
    private lateinit var documentRepository: DocumentRepository

    fun list(): List<Document> {
        return documentRepository.findByName("padou")
    }

    fun helloWorld(): Document {
        return documentRepository.findAll().first()
    }
}
