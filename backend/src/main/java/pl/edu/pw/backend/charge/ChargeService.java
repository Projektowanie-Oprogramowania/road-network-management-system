package pl.edu.pw.backend.charge;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChargeService {
    private final ChargeRepository chargeRepository;

    @Transactional
    ChargeDTO addCharge(AddChargeDTO addChargeDTO) {
        Charge charge = ChargeMapper.map(addChargeDTO);
        return ChargeMapper.map(chargeRepository.save(charge));
    }

    @Transactional
    ChargeDTO updateCharge(AddChargeDTO chargeDTO, int id) {
        Charge charge = chargeRepository.findById(id).orElseThrow();
        charge.setAmount(chargeDTO.amount);
        charge.setDescription(chargeDTO.description);
        charge.setDate(chargeDTO.date);
        charge.setChargeType(chargeDTO.chargeType);
        charge.setUserID(chargeDTO.userID);
        charge.setPaid(chargeDTO.isPaid);
        return ChargeMapper.map(chargeRepository.save(charge));
    }

    void removeCharge(int id) {
        chargeRepository.deleteById(id);
    }

    ChargeDTO getCharge(int id) {
        Charge charge = chargeRepository.findById(id).orElseThrow();
        return ChargeMapper.map(charge);
    }

    List<ChargeDTO> getChargesByUserID(int id) {
        return ChargeMapper.map(chargeRepository.findAllByUserID(id));
    }
}
