package pl.edu.pw.backend.roads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.pw.backend.point.Point;
import pl.edu.pw.backend.region.Region;
import pl.edu.pw.backend.segment.Segment;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Road {
    private int id;
    private List<Segment> segments;
    private String name;
    private Point startingPoint;
    private Point endingPoint;
    private double length;
    private Region region;
}
