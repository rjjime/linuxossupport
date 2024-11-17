pipeline {
    agent { label 'docker-agent' } // Specify the Docker agent node
    environment {
        NODE_HOME = '/usr/local/bin/node'
    }
    stages {
        stage('Install Composer') {
            steps {
                script {
                    // Install Composer if not already present
                    sh 'curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer'
                }
            }
        }
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out the source code...'
                checkout scm
            }
        }
        stage('Build') {
            steps {
                echo 'Building the project...'
                // Add build commands here
                sh 'composer install'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add test commands here
                sh 'npm test'
                sh 'phpunit'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying to staging/production...'
                // Add deployment commands here
            }
        }
    }
}
