package pl.edu.pw.backend.infrastructure;

import lombok.*;
import pl.edu.pw.backend.point.Point;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.OneToOne;


@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
class Infrastructure {
    @Id
    private Long id;

    @NonNull
    private String name;

    @NonNull
    @OneToOne
    private Point location;

    @NonNull
    private InfrastructureType infrastructureType;
}
