def host_name = ""
def params=[:]

pipeline { 
    agent any 
    environment{
        dockerhub=credentials('dockerhub_cred_1')
    }         

    stages{ 
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
                docker build -t $dockerhub_USR/$host_name:latest .
                echo "$dockerhub_PSW | docker login -u $dockerhub_USR --password-stdin"
                docker ps
                """ 
            } 
        } 
    }        
    post{         

        always{      
            sh """
            docker push $dockerhub_USR/$host_name:latest
            """
            echo 'This pipeline is completed.' 
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