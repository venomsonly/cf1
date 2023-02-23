def host_name = ""
def params=[:]
def SERVERIP = "15.204.60.78"
pipeline { 
    // agent any 
    agent {
        docker { image 'node:18' }
    }
    environment{
        dockerhub=credentials('dockerhub_cred_1')
    }         

    stages{ 
        // stage("0. Configuring SSH"){
        //     steps{
        //         - eval $(ssh-agent -s)    
        //         - echo "$SSH_PRIVATE_KEY" | ssh-add -
        //         - mkdir ~/.ssh
        //         - chmod 700 ~/.ssh
        //         - ssh-keyscan $SERVERIP >> ~/.ssh/known_hosts
        //         - chmod 644 ~/.ssh/known_hosts

        //     }
        // }
        stage("1. Clean, install node packages and build the code"){ 
            steps{
                
                sh """
                echo "cleaning previous builds."
                rm -rf .DS_Store .git node_modules .next build
                echo "cleaned."
                yarn install
                yarn build
                echo "next project build done."
                """ 
            } 
        } 
        stage("2. Read .env file"){ 
            steps{ 
                echo 'Reading .env file' 
                script {
                    final String content = readFile(file: ".env")
                    final List myKeys = extractLines(content)
                    
                    myKeys.eachWithIndex { item, index ->
                        String[] str = item.split('=')
                        params.put(str[0],str[1])
                        
                    }

                   host_name = params.get('NEXT_PUBLIC_HOSTNAME')
                }
                sh """
                echo "the host name is $host_name"
                """

            } 
        } 
        stage("3. Build docker image from Dockerfile and tag with hostname"){ 
            steps{ 
                sh """
                echo "Step 3 of main"
                echo docker login and image building
                """
                sh "docker build -t $dockerhub_USR/$host_name:latest ."
            } 
        } 
    
    stage("4. Push docker to dockerhub with tag $hostname:latest"){ 
            steps{ 
                sh """
                echo "Step 3 of main"
                echo docker login and image building
                """
                sh "docker build -t $dockerhub_USR/$host_name:latest ."
            } 
        } 
    }      
    post{         

        always{      
            sh """
            docker ps
            """
            echo 'This pipeline is completed. Sending slack msg now!' 
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
