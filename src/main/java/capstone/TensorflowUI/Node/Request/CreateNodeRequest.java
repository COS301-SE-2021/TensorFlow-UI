package capstone.TensorflowUI.Node.Request;

public class CreateNodeRequest {
    private int position;

    public CreateNodeRequest(int pos) {
        this.position = pos;
    }

    public int getPosition() {
        return position;
    }
}
