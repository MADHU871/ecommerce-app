pipeline {

    agent any

    environment {

        IMAGE_NAME = "mad0008271/ecommerce-app"
        CONTAINER_NAME = "ecommerce-container"

        AZURE_WEBAPP_NAME = "mad-ecommerce-app-2026"
        AZURE_RESOURCE_GROUP = "ecommerce-group2"

    }

    stages {

        stage('Git Checkout') {

            steps {

                git branch: 'main',
                url: 'https://github.com/MADHU871/ecommerce-app.git'

            }
        }

        stage('Check Files') {

            steps {

                sh 'pwd'
                sh 'ls -la'

            }
        }

        stage('Docker Build') {

            steps {

                sh '''
                docker build -t $IMAGE_NAME .
                '''

            }
        }

        stage('Docker Login') {

            steps {

                sh '''
                docker login -u mad0008271 -p YOUR_DOCKER_PASSWORD
                '''

            }
        }

        stage('Docker Push') {

            steps {

                sh '''
                docker push $IMAGE_NAME
                '''

            }
        }

        stage('Docker Pull') {

            steps {

                sh '''
                docker pull $IMAGE_NAME
                '''

            }
        }

        stage('Stop Old Container') {

            steps {

                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                '''

            }
        }

        stage('Docker Run') {

            steps {

                sh '''
                docker run -d \
                --name $CONTAINER_NAME \
                -p 3007:3000 \
                $IMAGE_NAME
                '''

            }
        }

        stage('Docker Logs') {

            steps {

                sh '''
                docker logs $CONTAINER_NAME
                '''

            }
        }

        stage('Docker Copy') {

            steps {

                sh '''
                mkdir -p backup

                docker cp \
                $CONTAINER_NAME:/app/package.json \
                backup/package.json || true
                '''

            }
        }

        stage('Docker Error Check') {

            steps {

                sh '''
                docker ps -a
                docker images
                '''

            }
        }

        stage('Cloudflare Trigger') {

            steps {

                echo 'Cloudflare deployment triggered'

            }
        }

        stage('Azure Login') {

            steps {

                sh '''
                az login
                '''

            }
        }

        stage('Azure Deploy') {

            steps {

                sh '''
                az webapp config container set \
                --name $AZURE_WEBAPP_NAME \
                --resource-group $AZURE_RESOURCE_GROUP \
                --docker-custom-image-name $IMAGE_NAME
                '''

            }
        }

        stage('Azure Restart WebApp') {

            steps {

                sh '''
                az webapp restart \
                --name $AZURE_WEBAPP_NAME \
                --resource-group $AZURE_RESOURCE_GROUP
                '''

            }
        }

        stage('Automation Complete') {

            steps {

                echo 'Full CI/CD Pipeline Completed'

            }
        }
    }

    post {

        success {

            echo 'Pipeline executed successfully'

        }

        failure {

            echo 'Pipeline failed'

        }
    }
}