package pl.edu.pw.backend.charge;

import java.util.List;
import java.util.stream.Collectors;

public class ChargeMapper {
    public static ChargeDTO map(Charge charge) {
        return new ChargeDTO(
                charge.getId(),
                charge.getAmount(),
                charge.getDescription(),
                charge.getDate(),
                charge.getChargeType(),
                charge.getUserID(),
                charge.isPaid()
        );
    }

    public static Charge map(AddChargeDTO addChargeDTO) {
        return new Charge (
                addChargeDTO.getAmount(),
                addChargeDTO.getDescription(),
                addChargeDTO.getDate(),
                addChargeDTO.getChargeType(),
                addChargeDTO.getUserID(),
                addChargeDTO.isPaid()
        );
    }

    public static List<ChargeDTO> map(List<Charge> charges) {
        return charges
                .stream().map(ChargeMapper::map)
                .collect(Collectors.toList());
    }

    public static Charge map(ChargeDTO charge) {
        return new Charge(
            charge.getAmount(),
            charge.getDescription(),
            charge.getDate(),
            charge.getChargeType(),
            charge.getUserID(),
            charge.isPaid()
        );
    }
}
