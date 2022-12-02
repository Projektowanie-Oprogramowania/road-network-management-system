package pl.edu.pw.backend.segment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import pl.edu.pw.backend.point.Point;
import pl.edu.pw.backend.tariff.Tariff;

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
    @Cascade(CascadeType.MERGE)
    private List<Point> points;

    @ManyToOne
    @Cascade(CascadeType.MERGE)
    private Point startingPoint;

    @ManyToOne
    @Cascade(CascadeType.MERGE)
    private Point endingPoint;

    @ManyToOne
    @JoinColumn(name = "tariff_id")
    private Tariff tariff;

    public Segment(List<Point> points, Point startingPoint, Point endingPoint, BigDecimal price) {
        this.points = points;
        this.startingPoint = startingPoint;
        this.endingPoint = endingPoint;
        this.price = price;
    }
}
