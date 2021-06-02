package capstone.TensorflowUI.Node.Model;


import java.util.ArrayList;
import java.util.UUID;

public class Node {
    private UUID id;
    private int position;
    private ArrayList<Node> nodes;
    private Node input;
    private Node output;

    public Node(int position){
        this.position = position;
    }

    public void addNode(Node n){
        nodes.add(n);
    }

    public int getPosition(){return position;}
}
