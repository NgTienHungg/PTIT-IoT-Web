package com.example.iot.ledfan;


import com.example.iot.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class LedFanController extends Controller {

    @GetMapping("/fanlights")
    public List<LedFan> getAllLedFans(Model model) {
        List<LedFan> ledFans = new ArrayList<>();

        try {
            String query = "SELECT * FROM ledFan";
            PreparedStatement ps = connection.prepareStatement(query);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                int id = rs.getInt("id"); // id
                String name = rs.getString("name"); // thietbi
                String status = rs.getString("status"); // trangthai
                Timestamp date = rs.getTimestamp("date"); // thoigian
                ledFans.add(new LedFan(id, name, status, date));
            }
            ps.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return ledFans;
    }

    @PostMapping("/add-ledfan")
    public LedFan addLedFan(@RequestBody LedFan ledFan) throws SQLException {
        ledFan.setDate(Timestamp.valueOf(LocalDateTime.now()));

        try {
            String query = "INSERT INTO ledFan VALUES(?, ?, ?, ?)";
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setInt(1, ledFan.getId());
            ps.setString(2, ledFan.getName());
            ps.setString(3, ledFan.getStatus());
            ps.setTimestamp(4, ledFan.getDate());
            ps.executeUpdate();
            ps.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return ledFan;
    }

    @GetMapping("/searchfanlight")
    public List<LedFan> getFanLed(Model model, @RequestParam("startTime") Timestamp startTime, @RequestParam("endTime") Timestamp endTime) {
        List<LedFan> ledFans = new ArrayList<>();

        try {
            String query = "SELECT * FROM ledFan WHERE date BETWEEN ? AND ?";
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setTimestamp(1, startTime);
            ps.setTimestamp(2, endTime);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                String status = rs.getString("status");
                Timestamp date = rs.getTimestamp("date");
                ledFans.add(new LedFan(id, name, status, date));
            }
            ps.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return ledFans;
    }

    @GetMapping("/count-led")
    public int getCountOnLed() {
        String query = "SELECT COUNT(*) AS count FROM ledFan WHERE (name = 'led' OR name = 'Led') AND (status = 'on' OR status = 'On')";
        try (PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {

            if (rs.next()) {
                System.out.println("so lan bat den: " + rs.getInt("count"));
                return rs.getInt("count");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0; // Trong trường hợp có lỗi
    }
}
