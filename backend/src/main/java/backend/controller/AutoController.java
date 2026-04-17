package backend.controller;

import backend.entity.Auto;
import backend.service.AutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/autos")
@CrossOrigin(origins = "*")
public class AutoController {

    private final AutoService autoService;

    public AutoController(AutoService autoService) {
        this.autoService = autoService;
    }

    @GetMapping
    public List<Auto> listarAutos() {
        return autoService.listarAutos();
    }

    @PostMapping("/{usuarioId}")
    public ResponseEntity<Auto> guardarAuto(@RequestBody Auto auto, @PathVariable Long usuarioId) {
        Auto autoGuardado = autoService.guardarAuto(auto, usuarioId);

        if (autoGuardado != null) {
            return ResponseEntity.ok(autoGuardado);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auto> obtenerPorId(@PathVariable Long id) {
        Auto auto = autoService.obtenerPorId(id);

        if (auto != null) {
            return ResponseEntity.ok(auto);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Auto> actualizar(@PathVariable Long id, @RequestBody Auto auto) {
        Auto actualizado = autoService.actualizarAuto(id, auto);

        if (actualizado != null) {
            return ResponseEntity.ok(actualizado);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id) {
        boolean eliminado = autoService.eliminarAuto(id);

        if (eliminado) {
            return ResponseEntity.ok("Auto eliminado");
        }

        return ResponseEntity.notFound().build();
    }
}