package pl.edu.pw.backend.roads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;
import pl.edu.pw.backend.point.PointDTO;
import pl.edu.pw.backend.region.RegionDTO;
import pl.edu.pw.backend.segment.SegmentDTO;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
class RoadDTO {
    int id;
    List<SegmentDTO> segments;
    String name;
    PointDTO startingPoint;
    PointDTO endingPoint;
    double length;
    RegionDTO region;
}
