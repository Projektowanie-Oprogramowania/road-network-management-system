package pl.edu.pw.backend.roads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.pw.backend.point.Point;
import pl.edu.pw.backend.region.Region;
import pl.edu.pw.backend.segment.Segment;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Road {
    @Id
    private int id;

    @OneToMany
    private List<Segment> segments;
    private String name;

    @ManyToOne
    private Point startingPoint;

    @ManyToOne
    private Point endingPoint;
    private double length;

    @ManyToOne
    private Region region;
}
