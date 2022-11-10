package pl.edu.pw.backend.roads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.springframework.beans.factory.annotation.Required;
import pl.edu.pw.backend.point.Point;
import pl.edu.pw.backend.region.Region;
import pl.edu.pw.backend.segment.Segment;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Road {
    public Road(List<Segment> segments, String name, Point startingPoint, Point endingPoint, double length, Region region) {
        this.segments = segments;
        this.name = name;
        this.startingPoint = startingPoint;
        this.endingPoint = endingPoint;
        this.length = length;
        this.region = region;
    }

    @GeneratedValue
    @Id
    private int id;
    @OneToMany
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private List<Segment> segments;

    private String name;

    @ManyToOne
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Point startingPoint;

    @ManyToOne
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Point endingPoint;
    private double length;

    @ManyToOne
    private Region region;
}
