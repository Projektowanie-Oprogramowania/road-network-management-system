package pl.edu.pw.backend.ride;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
class AddRideDTO {

    int chargeID;

//    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    Date startDate;

//    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    Date endDate;
    List<Integer> segments;
    String carRegistrationNumber;
}
