package pl.edu.pw.backend.segment;

import java.math.BigDecimal;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.pw.backend.tariff.Tariff;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateSegmentDTO {

    int id;
    List<Long> pointsIds;
    Long startingPointId;
    Long endingPointId;
    Long tariffId;
}
