package capstone.TensorflowUI.Node.Model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.UUID;

public class Node {
    @JsonProperty ("id")
    private UUID id;
    @JsonProperty("position")
    private int position;
    @JsonProperty("nodes")
    private ArrayList<Node> nodes;
    @JsonProperty("input")
    private Node input;
    @JsonProperty("output")
    private Node output;

    /*Constructor*/
    public Node(int position,UUID id){
        this.position = position;
        this.id = id;
    }

    /*Add and Remove Nodes */
    public void addNode(Node n){
        if(this.nodes == null) {
            this.nodes = new ArrayList<Node>();
            this.nodes.add(n);
        }
        else {
            this.nodes.add(n);
        }
    }

    public void removeNode(Node n){nodes.remove(n);}

    /*Getters and Setters*/
    public int getPosition(){return position;}

    public UUID getId(){return id;}

    //public void setId(UUID id){this.id = id;}

    public Node getInput(){return input;}

    public void setInput(Node input){this.input = input;}

    public Node getOutput(){return output;}

    public void setOutput(Node output){this.output = output;}
}
