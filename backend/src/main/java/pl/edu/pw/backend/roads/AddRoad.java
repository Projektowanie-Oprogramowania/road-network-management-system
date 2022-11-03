package pl.edu.pw.backend.roads;

import lombok.Value;
import pl.edu.pw.backend.point.PointDTO;
import pl.edu.pw.backend.region.RegionDTO;
import pl.edu.pw.backend.segment.SegmentDTO;

import java.util.List;

@Value
public class AddRoad {
    List<SegmentDTO> segments;
    String name;
    PointDTO startingPoint;
    PointDTO endingPoint;
    double length;
    RegionDTO region;
}
