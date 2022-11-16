package pl.edu.pw.backend.infrastructure;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.pw.backend.point.PointDTO;
import pl.edu.pw.backend.point.PointMapper;

@Data
@AllArgsConstructor
@NoArgsConstructor
class UpdateInfrastructureDTO {

    private Long id;
    private String name;
    private PointDTO location;
    private InfrastructureType infrastructureType;

    public Infrastructure toInfrastructure() {
        return new Infrastructure(id, name, PointMapper.map(location), infrastructureType);
    }

}
