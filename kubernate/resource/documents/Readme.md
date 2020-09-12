 # <img src="../images/mongodb.png" width="" height="30"> Mongodb on <img src="../images/kubernetes.png" width="" height="27"> Kubernetes

## Create Cluster by KinD
***[KinD](https://kubernetes.io/blog/2020/05/21/wsl-docker-kubernetes-on-the-windows-desktop/): Kubernetes made easy in a container***. 
<br>
<br>
Right now, we have Docker that is installed, configured and the last test worked fine.

This is normal as we didn't enable the Docker Kubernetes cluster. So let's install KinD and create our first cluster.
<br>
> <font color="green"> *# Download the latest version of KinD* </font><br>
> curl -Lo ./kind https://github.com/kubernetes-sigs/kind/releases/download/v0.7.0/kind-$(uname)-amd64<br><br>
> <font color="green"> *# Make the binary executable* </font><br>
> chmod +x ./kind<br><br>
> <font color="green"> *# Move the binary to your executable path* </font><br>
>sudo mv ./kind /usr/local/bin/<br><br>

> <font color="green"> *# Create a config file for a nodes cluster* </font><br>
> kind-cluster.yaml<br>
>> kind: Cluster<br>
>> apiVersion: kind.x-k8s.io/v1alpha4<br>
>> nodes:<br>
>> &emsp;`-` role: control-plane<br>
>> &emsp;&ensp;&nbsp;extraPortMappings:<br>
>> &emsp;&emsp;&emsp;`-` containerPort: 30500<br>
>> &emsp;&emsp;&emsp;&emsp;hostPort: 30500<br>
>> &emsp;&emsp;&emsp;&emsp;listenAddress: "0.0.0.0"<br>

<br>Create Cluster

> <font color="green"> *# Create a new cluster with the config file* </font><br>
> kind create cluster --config ./kind-cluster.yaml<br><br>
> <font color="green"> *# Check how many nodes it created* </font><br>
kubectl get nodes<br><br>

<br>Create Service

> <font color="green"> *# Create YAML file for a new Service* </font><br>
> service-mongodb.yaml<br>
>> apiVersion: v1<br>
>> kind: Service<br>
>> metadata:<br>
>> &emsp;name: mongodb<br>
>> spec:<br>
>> &emsp;selector:<br>
>> &emsp;&emsp;app: database<br>
>> &emsp;ports:<br>
>> &emsp;&emsp;`-` protocol: TCP<br>
>> &emsp;&emsp;&emsp;port: 27017<br>
>> &emsp;&emsp;&emsp;targetPort: 27017<br>
>> &emsp;&emsp;&emsp;nodePort: 30500<br>
>> &emsp;type: NodePort<br>

> <font color="green"> *# Create a new Service* </font><br>
> kubectl apply -f service-mongodb.yaml

<br>Create Pod

> <font color="green"> *# Create YaaML file for a new Pod* </font><br>
> mongodb-pod.yaml<br>
>> apiVersion: v1<br>
>> kind: Pod<br>
>> metadata:<br>
>> &emsp;name: mongodb<br>
>> &emsp;labels:<br>
>> &emsp;&emsp;app: database<br>
>> spec:<br>
>> &emsp;containers:<br>
>> &emsp;&emsp;&ensp;`-` name: mongodb<br>
>> &emsp;&emsp;&emsp;&ensp;image: mongo:4.0.8<br>
>> &emsp;&emsp;&emsp;&ensp;env:<br>
>> &emsp;&emsp;&emsp;&emsp;&ensp;`-` name: MONGO_INITDB_ROOT_USERNAME<br>
>> &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;value: "root"<br>
>> &emsp;&emsp;&emsp;&emsp;&ensp;`-` name: MONGO_INITDB_ROOT_PASSWORD<br>
>> &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;value: "root"<br>

> <font color="green"> *# Create a new Pod* </font><br>
> kubectl apply -f mongodb-pod.yaml

<br> 

## Test connect mongodb
<br>
<img src="../images/testConnect.png" width="" height="350" style="vertical-align:middle">
  
