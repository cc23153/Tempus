public class User {
    protected String username;
    protected String nickname;
    protected String email;
    protected int numTasks;

    // método construtor
    public User(String username, String nickname, String email, int numTasks) {
        this.username = username;
        this.nickname = nickname;
        this.email = email;
        if (numTasks < 0) {
            throw new IllegalArgumentException("Número de tarefas inválido!");
        }
        this.numTasks = numTasks;
    }

    // getters
    public String getUsername() {
        return this.username;
    }

    public String getNickname() {
        return this.nickname;
    }

    public String getEmail() {
        return this.email;
    }

    public int getNumTasks() {
        return this.numTasks;
    }

    // método toString() --> retorna os objetos em formato de String
    @Override
    public String toString() {
        return  "Username: " + this.username + 
                "\nNickname: " + this.nickname + 
                "\nEmail: " + this.email +
                "\nNúmero de tarefas: " + this.numTasks;
    }
}
