import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Conexao {

    public static void main(String[] args) {
        String url = "jdbc:sqlserver://regulus.cotuca.unicamp.br:1433/BD23153";

        String usuario = "BD23153";
        String senha = "BD23153";
        int user_id = 1;

        try {
            Connection conexao = DriverManager.getConnection("jdbc:sqlserver://regulus.cotuca.unicamp.br:1433;database=BD23153;user=BD23153;password=BD23153;encrypt=false;trustServerCertificate=true");
            System.out.println("Entrou no banco de dados.");

            String queryUsername = "SELECT username FROM Tempus.[User] WHERE user_id = ?";
            String queryNickname = "SELECT nickname FROM Tempus.[User] WHERE user_id = ?";
            String queryEmail = "SELECT email FROM Tempus.[User] WHERE user_id = ?";
            String queryNumTasks = "SELECT COUNT(task_id) FROM Tempus.Task WHERE user_id = ?";

            try (PreparedStatement pstmtUsername = conexao.prepareStatement(queryUsername);
                 PreparedStatement pstmtNickname = conexao.prepareStatement(queryNickname);
                 PreparedStatement pstmtEmail = conexao.prepareStatement(queryEmail);
                 PreparedStatement pstmtNumTasks = conexao.prepareStatement(queryNumTasks)) {

                pstmtUsername.setInt(1, user_id);
                pstmtNickname.setInt(1, user_id);
                pstmtEmail.setInt(1, user_id);
                pstmtNumTasks.setInt(1, user_id);

                String username = executeQueryAndGetString(pstmtUsername);
                String nickname = executeQueryAndGetString(pstmtNickname);
                String email = executeQueryAndGetString(pstmtEmail);
                int numTasks = executeQueryAndGetInt(pstmtNumTasks);

                if (numTasks <= 0) {
                    throw new IllegalArgumentException("O usuário não possui nenhuma task.");
                }

                if (numTasks < 50) {
                    User user = new User(username, nickname, email, numTasks);
                    // Further processing for user
                } else {
                    UserWithStatus userWithStatus = new UserWithStatus(username, nickname, email, numTasks);
                    // Further processing for userWithStatus
                }
            }

        } catch (SQLException excessao) {
            excessao.printStackTrace();
        }
    }

    private static String executeQueryAndGetString(PreparedStatement pstmt) throws SQLException {
        try (ResultSet rs = pstmt.executeQuery()) {
            return rs.next() ? rs.getString(1) : "";
        }
    }

    private static int executeQueryAndGetInt(PreparedStatement pstmt) throws SQLException {
        try (ResultSet rs = pstmt.executeQuery()) {
            return rs.next() ? rs.getInt(1) : 0;
        }
    }
}
