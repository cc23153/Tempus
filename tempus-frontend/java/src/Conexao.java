import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Scanner;

public class Conexao {

    public static void main(String[] args) {
        String url = "jdbc:sqlserver://regulus.cotuca.unicamp.br:1433/BD23153";

        String usuario = "BD23153";
        String senha = "BD23153";
        //String username = "zbl4ck";

        Scanner input = new Scanner(System.in);
        System.out.println("Digite o seu username: ");
        String username = input.next();

        input.close();

        try {
            Connection conexao = DriverManager.getConnection("jdbc:sqlserver://regulus.cotuca.unicamp.br:1433;database=BD23153;user=BD23153;password=BD23153;encrypt=false;trustServerCertificate=true");
            System.out.println("Entrou no banco de dados.");

            String queryUser_id = "SELECT user_id FROM Tempus.[User] WHERE username = ?";
            String queryNickname = "SELECT nickname FROM Tempus.[User] WHERE username = ?";
            String queryEmail = "SELECT email FROM Tempus.[User] WHERE username = ?";
            // String queryNumTasks = "SELECT register_datetime FROM Tempus.[User] WHERE user_id = ?";

             try (PreparedStatement pstmtUser_id = conexao.prepareStatement(queryUser_id);
                 PreparedStatement pstmtNickname = conexao.prepareStatement(queryNickname);
                 PreparedStatement pstmtEmail = conexao.prepareStatement(queryEmail);
                //  PreparedStatement pstmtNumTasks = conexao.prepareStatement(queryNumTasks);
                ) {

                pstmtUser_id.setString(1, username);
                pstmtNickname.setString(1, username);
                pstmtEmail.setString(1, username);

                int user_id = executeQueryAndGetInt(pstmtUser_id);
                // pstmtNumTasks.setInt(1, user_id);

                
                String nickname = executeQueryAndGetString(pstmtNickname);
                String email = executeQueryAndGetString(pstmtEmail);
                // int numTasks = executeQueryAndGetInt(pstmtNumTasks);
                int numTasks = 70;

                if (numTasks <= 0) {
                    throw new IllegalArgumentException("O usuário não possui nenhuma task.");
                }

                if (numTasks < 50) {
                    User user = new User(username, nickname, email, numTasks);
                    System.out.println(user.toString());
                    // Further processing for user
                } else {
                    UserWithStatus userWithStatus = new UserWithStatus(username, nickname, email, numTasks);
                    System.out.println(userWithStatus.toString());
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
