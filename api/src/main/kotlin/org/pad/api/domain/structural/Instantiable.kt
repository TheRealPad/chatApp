package org.pad.api.domain.structural

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.persistence.*
import lombok.AllArgsConstructor
import lombok.Builder
import lombok.Data
import lombok.NoArgsConstructor
import lombok.experimental.SuperBuilder
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes
import org.jetbrains.annotations.NotNull
import org.springframework.data.annotation.CreatedBy
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedBy
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.io.Serializable
import java.time.Instant
import java.util.*

@Data
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
@SuperBuilder(toBuilder = true)
@EntityListeners(AuditingEntityListener::class)
@JsonInclude(JsonInclude.Include.ALWAYS)
open class Instantiable : Serializable {

    @Id
    @Column(updatable = false)
    @GeneratedValue(generator = "uuid2")
    @JdbcTypeCode(SqlTypes.CHAR)
    @NotNull
    @Builder.Default
    @JsonProperty("uuid")
    var uuid: UUID = UUID.randomUUID()

    @CreatedDate
    @Column(updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @Builder.Default
    var createdDate: Date = Date.from(Instant.now())

    @CreatedBy
    @Column(updatable = false)
    @Builder.Default
    var createdBy = ""

    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Builder.Default
    var lastModified: Date = Date.from(Instant.now())

    @LastModifiedBy
    @Builder.Default
    var editedBy = ""

}
