package pl.edu.pw.backend.infrastructure;

import javax.persistence.CascadeType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import lombok.*;
import pl.edu.pw.backend.point.Point;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.OneToOne;


@Table(name = "infrastructures")
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
public class Infrastructure {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NonNull
    private String name;

    @NonNull
    @OneToOne(cascade = CascadeType.ALL)
    private Point location;

    @NonNull
    private InfrastructureType infrastructureType;
}
