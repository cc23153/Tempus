public class UserWithStatus extends User{
    private String statusUser;

    // método construtor
    public UserWithStatus(String username, String nickname, String email, int numTasks) {
        super(username, nickname, email, numTasks);
        this.statusUser = "";
    }

    // método que vai definir o status do usuário
    public void gerarStatus() {
        if (this.numTasks >= 50 && this.numTasks < 100) {
            this.statusUser = "Usuário acima da média";
        }
        else if (this.numTasks >= 100 && this.numTasks < 150) {
            this.statusUser = "Usuário de alta categoria";
        }
        else if (this.numTasks >= 150 && this.numTasks < 200) {
            this.statusUser = "Usuário Premium";
        }
        else if (this.numTasks >= 200) {
            this.statusUser = "Um dos maiores usuários de todos os Tempus";
        }
    }

    // getter
    public String getStatus() {
        return this.statusUser;
    }

    // método toString() --> retorna os objetos em formato de String
    @Override
    public String toString() {
        return  this.statusUser + 
                "\n\n\nUsername: " + this.username + 
                "\nNickname: " + this.nickname + 
                "\nEmail: " + this.email +
                "\nNúmero de tarefas: " + this.numTasks;
    }
}
