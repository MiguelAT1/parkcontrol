package backend.controller;

import backend.entity.Movimiento;
import backend.service.MovimientoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movimientos")
@CrossOrigin(origins = "*")
public class MovimientoController {

    private final MovimientoService movimientoService;

    public MovimientoController(MovimientoService movimientoService) {
        this.movimientoService = movimientoService;
    }

    @GetMapping
    public List<Movimiento> listarMovimientos() {
        return movimientoService.listarMovimientos();
    }

    @PostMapping("/entrada/{autoId}")
    public String registrarEntrada(@PathVariable Long autoId) {
        return movimientoService.registrarEntrada(autoId);
    }

    @PostMapping("/salida/{autoId}")
    public String registrarSalida(@PathVariable Long autoId) {
        return movimientoService.registrarSalida(autoId);
    }

    @GetMapping("/capacidad")
    public String verCapacidad() {
        long autosDentro = movimientoService.contarAutosDentro();
        long espaciosDisponibles = movimientoService.espaciosDisponibles();

        return "Autos dentro: " + autosDentro + " | Espacios disponibles: " + espaciosDisponibles;
    }
}