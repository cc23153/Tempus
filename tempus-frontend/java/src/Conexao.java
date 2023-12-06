import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexao {
    
    public static void main(String[] args) {
        String url = "jdbc:sqlserver://regulus.cotuca.unicamp.br:1433;database=BD23153;user=BD23153;password=BD23153;encrypt=true;trustServerCertificate=true;schema=Tempus";
        String usuario = "BD23153";
        String senha = "BD23153";

        try (Connection conexao = DriverManager.getConnection(url, usuario, senha)) {
            System.out.println("Entrou no banco de dados.");
        }
        catch (SQLException excessao) {
            excessao.printStackTrace();
        }
    }
}