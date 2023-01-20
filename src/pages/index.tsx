import { Box, Flex, Spacer } from "@chakra-ui/react"
import React, { useState, useEffect } from "react"
import { Card, Input, Container, CardHeader, CardBody, CardFooter, ButtonGroup, Image, Divider, Heading, Text, Stack, Button } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';

const Home = () => {
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('') ;
  const [avatar, setAvatar] = useState('') ;
  const [userInput, setUserInput] = useState('');
  const [reposUrl, setReposUrl] = useState('');
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch('https://api.github.com/users/petkdev')
      .then(res => res.json())
      .then(data => {
        setData(data);

      });
  }, []);

  const setData = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url,
    repos_url
  }) => {
    setName(name);
    setUsername(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setReposUrl(repos_url);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
          setError(null);
        }
      });
  };

  return (


    <>
      <Container>
        <Stack spacing={3}>
          <Formik
            initialValues={{
              value: '',
           
            }}
            onSubmit={handleSubmit}
            
          >

            <Form>
              <label htmlFor="firstName">First Name</label> <br />
              <Field id="firstName" name="firstName"  onChange={handleSearch} />
              <button type="submit">Submit</button>
            </Form>
          </Formik>

        </Stack>
      </Container>
      <Container>
        <Card maxW='sm'>
          <CardBody>
            <Image
              src={avatar}
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{name}</Heading>
              <Text>
                username: {userName}
              </Text>
              <Text color='blue.600' fontSize='2xl'>
                {followers} followers
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='2'>
              <Button variant='solid' colorScheme='blue'>
                {repos} repos
              </Button>

              <Link href={reposUrl} isExternal>
                <Button variant='ghost' colorScheme='blue'>
                  show repos
                </Button>
              </Link>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Container>

    </>
  )
}

export default Home



