package pl.edu.pw.backend.subscription;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("subscription")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @PostMapping
    ResponseEntity<SubscriptionDTO> addSubscription(@RequestBody AddSubscriptionDTO addSubscription) {
        return ResponseEntity.status(HttpStatus.CREATED).body(subscriptionService.addSubscription(addSubscription));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubscriptionDTO> updateSubscription(@RequestBody AddSubscriptionDTO subscriptionDTO, @PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(subscriptionService.updateSubscription(subscriptionDTO, id));
    }

    @DeleteMapping("/{id}")
    void removeSubscription(@PathVariable int id) {
        subscriptionService.removeSubscription(id);
    }

    @GetMapping("/{id}")
    SubscriptionDTO getSubscription(@PathVariable int id) {
        return subscriptionService.getSubscription(id);
    }

    @GetMapping("/user/{id}")
    List<SubscriptionDTO> getSubscriptionsByUserID(@PathVariable int id) {
        return subscriptionService.getSubscriptionsByUserID(id);
    }

}
