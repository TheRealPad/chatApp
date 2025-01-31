package org.pad.api.domain

import jakarta.persistence.Entity
import lombok.Getter
import lombok.Setter
import org.pad.api.domain.structural.Instantiable

@Entity
@Getter
@Setter
class Document : Instantiable() {
     var title: String? = null
}
