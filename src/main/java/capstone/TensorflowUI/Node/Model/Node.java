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
    public void addNode(Node n){
        if(this.nodes == null) {
            this.nodes = new ArrayList<Node>();
        }
        else {
            nodes.add(n);
        }
    }

    public void removeNode(Node n){nodes.remove(n);}

    /*Getters and Setters*/
    public int getPosition(){return position;}

    public UUID getId(){return id;}

    public void setId(UUID id){this.id = id;}

    public Node getInput(){return input;}

    public void setInput(Node input){this.input = input;}

    public Node getOutput(){return output;}

    public void setOutput(Node output){this.output = output;}
}
