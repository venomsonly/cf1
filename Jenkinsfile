def host_name=""
def node_port=""
def params=[:]
def SSH_USER="root"
def SERVERIP=""
def slackMsg="failed!!"
def slackChannel="#amt-cicd"

pipeline { 
    agent any 

    environment{
        dockerhub=credentials('dockerhub_cred_1')
    }         

    stages{ 
        stage("1. Clean, install node packages and build the code"){ 
            steps{
                script {
                    slackMsg="Failed at stage 1"
                    slackColor="warning"
                }                
                sh """
                echo "cleaning previous builds."
                rm -rf .DS_Store .git node_modules .next build
                echo "cleaned."
                yarn install
                yarn build
                echo "next project build done."
                """ 
                script {
                    slackMsg="Stage 1 passed"
                }
            } 
        } 
        stage("2. Read .env file"){ 
            steps{ 
                script {
                    slackMsg="Failed at stage 2"
                    slackColor="warning"
                }
                echo 'Reading .env file' 
                script {
                    final String content = readFile(file: ".env")
                    final List myKeys = extractLines(content)
                    
                    myKeys.eachWithIndex { item, index ->
                        String[] str = item.split('=')
                        params.put(str[0],str[1])
                        
                    }

                   host_name = params.get('NEXT_PUBLIC_HOSTNAME')
                   host_name = host_name.replace(".", "_")
                   node_port = params.get('NEXT_PUBLIC_NODE_PORT')
                   SERVERIP = params.get('NEXT_PUBLIC_HOST_IP')
                }
                sh """
                echo "the host name is $host_name"
                """
                script {
                    slackMsg="Stage 2 passed"
                }
            } 
        } 
        stage("3. Build docker image from Dockerfile and tag with hostname"){ 
            steps{ 
                
                script {
                    slackMsg="Failed at stage 3"
                    slackColor="warning"
                }
                sh "docker build -t $dockerhub_USR/n_$host_name:latest ."
                sh "docker images"
                script {
                    slackMsg="Stage 3 passed"
                }
            } 
        } 
    
    stage("4. Push docker to dockerhub"){ 
            steps{ 
                script {
                    slackMsg="Failed at stage 4"
                    slackColor="warning"
                }
                sh """
                echo "pushing image n_$host_name:latest"
                """
                sh "docker push $dockerhub_USR/n_$host_name"
                slackSend channel: "${slackChannel}", color: "good", message: "Image pushed: ${dockerhub_USR}/n_${host_name}"
                script {
                    slackMsg="Stage 4 passed"
                }
            } 
        }
    stage("5. Make changes to manifest file"){ 
            steps{ 
                script {
                    slackMsg="Failed at stage 5"
                    slackColor="warning"
                }
                sh """
                echo "Step 3 of main"
                """
                script{
                    sh "sed -i 's/PORT/${node_port}/g' ./nstack.yml"
                    sh "sed -i 's/HOSTNAME/${host_name}/g' ./nstack.yml"
                    }
                script {
                    slackMsg="Stage 5 passed"
                }
            } 
        }
        stage("6. Configuring SSH"){
            steps{
                script {
                    slackMsg="Failed at stage 6"
                    slackColor="warning"
                }
                echo "Establishing ssh connection"
                sshagent(credentials: ['SSH_PRIVATE_KEY']) {
                sh """
                    [ -d ~/.ssh ] || mkdir ~/.ssh && chmod 0700 ~/.ssh
                    ssh-keyscan "$SERVERIP" >> ~/.ssh/known_hosts
                    
                    ssh $SSH_USER@$SERVERIP "ls -la /home/jenkins_home/"
                    scp ./nstack.yml $SSH_USER@$SERVERIP:/home/jenkins_home/n_$host_name.yml
                    ssh $SSH_USER@$SERVERIP "docker stack rm n_$host_name"
                    ssh $SSH_USER@$SERVERIP "docker stack deploy -c /home/jenkins_home/n_$host_name.yml n_$host_name"
                    ssh $SSH_USER@$SERVERIP "cat /home/jenkins_home/n_$host_name.yml"
                """
                }
                script {
                    slackColor="good"
                    slackMsg="All 6 stages passed for  and deployed successfully"
                }
            }
        }
    } 


    post{         

        always{      
            
            sh """
            echo 'This pipeline is completed. Sending slack msg now!'
            """
            slackSend channel: "${slackChannel}", color: "${slackColor}", message: "${slackMsg}"
            
        } 
    } 
}


@NonCPS
List extractLines(final String content) {
    List myKeys = []
    content.eachLine { line -> 
        myKeys << line
    }
    return myKeys
}
