package pl.edu.pw.backend.subscription;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.pw.backend.charge.ChargeDTO;
import pl.edu.pw.backend.segment.SegmentDTO;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubscriptionDTO {
    int id;
    int userID;
    List<SegmentDTO> segments;
    String description;
    Date startDate;
    Date endDate;
    ChargeDTO charge;
}
