package pl.edu.pw.backend.segment;

import java.math.BigDecimal;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddSegmentDTO {

    List<Long> pointsIds;
    Long startingPointId;
    Long endingPointId;
    BigDecimal price;
}
