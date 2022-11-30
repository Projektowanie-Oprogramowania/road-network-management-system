package pl.edu.pw.backend.segment;

import java.math.BigDecimal;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.pw.backend.point.PointDTO;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SegmentDTO {

    int id;
    List<PointDTO> points;
    PointDTO startingPoint;
    PointDTO endingPoint;
    BigDecimal price;
}
