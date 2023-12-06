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

            String queryUsername = "SELECT username FROM Tempus.[User] WHERE user_id = '"user_id"'";
            String queryNickname = "SELECT nickname FROM Tempus.[User] WHERE user_id = '"user_id"'";
            String queryEmail = "SELECT email FROM Tempus.[User] WHERE user_id = '"user_id"'" ;
            int queryNumTasks = Number("COUNT(task_id) FROM Tempus.Task WHERE user_id = '"user_id"'");

            if (queryNumTasks <= 0) {
                throw new IllegalArgumentException("O usuário não possui nenhuma task.");
            }
            else if (queryNumTasks < 50) {
                User user = new User(queryUsername, queryNickname, queryEmail, queryNumTasks);
            }
            else {
                UserWithStatus userWithStatus = new UserWithStatus(queryUsername, queryNickname, queryEmail, queryNumTasks);
            }

        }
        catch (SQLException excessao) {
            excessao.printStackTrace();
        }
    }
}