package pl.edu.pw.backend.segment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import pl.edu.pw.backend.point.Point;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Segment {
    @GeneratedValue
    @Id
    private int id;

    @OneToMany
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private List<Point> points;

    @ManyToOne
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Point startingPoint;

    @ManyToOne
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Point endingPoint;
    private BigDecimal price;

    public Segment(List<Point> points, Point startingPoint, Point endingPoint, BigDecimal price) {
        this.points = points;
        this.startingPoint = startingPoint;
        this.endingPoint = endingPoint;
        this.price = price;
    }
}
