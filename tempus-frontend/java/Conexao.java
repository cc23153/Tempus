import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexao {
    String url = "jdbc:sqlserver://regulus:5050;database=BD23153;user=BD23153;password=BD23153;encrypt=true;schema=Tempus";
    String usuario = "BD23153";
    String senha = "BD23153";

    public void testarConexao() {
        try (Connection conexao = DriverManager.getConnection(url, usuario, senha)) {
            System.out.println("Entrou no banco de dados.");
        }
        catch (SQLException excessao) {
            excessao.printStackTrace();
        }
    }
}