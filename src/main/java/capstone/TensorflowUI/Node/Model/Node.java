package capstone.TensorflowUI.Node.Model;


import java.util.ArrayList;
import java.util.UUID;

public class Node {
    private UUID id;
    private int position;
    private ArrayList<Node> nodes;
    private Node input;
    private Node output;

    /*Constructor*/
    public Node(int position){this.position = position;}

    /*Add and Remove Nodes */
    public void addNode(Node n){nodes.add(n);}

    public void removeNode(Node n){nodes.remove(n);}

    public int getPosition(){return position;}
}
