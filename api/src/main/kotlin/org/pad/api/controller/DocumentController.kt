package org.pad.api.controller

import org.pad.api.domain.Document
import org.pad.api.service.DocumentService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController


@RestController(value = "document controller")
class DocumentController {

    @Autowired
    private lateinit var documentService: DocumentService

    @GetMapping("/hello")
    fun getDocxFile(): Document {
        return documentService.helloWorld()
    }

}
