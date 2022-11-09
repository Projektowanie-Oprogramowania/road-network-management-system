package pl.edu.pw.backend.segment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.pw.backend.point.Point;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Segment {
    @Id
    private int id;

    @OneToMany
    private List<Point> points;

    @ManyToOne
    private Point startingPoint;

    @ManyToOne
    private Point endingPoint;
    private BigDecimal price;
}
