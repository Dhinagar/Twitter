import React from "react";
import {
    Box,
    Center,
    Text,
    FormControl,
    InputGroup,
    InputLeftElement,
    Input,
    Select,
    Button,
    VStack,
    HStack,
    Image,
    Spinner,
    useToast,
    Avatar,
    Badge,
    Icon,
    Flex
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux'
import { post, get } from '../../Provider/index';
import RestAPI from '../../services/index'
import { searchTweets } from '../../redux/actions/productAction'
import { BsChevronUp, BsFillBellFill } from "react-icons/bs";
import { Search2Icon } from '@chakra-ui/icons';
import { AiOutlineHome, AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";
import { FaHashtag, FaRegComment } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { BsBookmark, BsUpload } from "react-icons/bs";
import { RiFileListLine } from "react-icons/ri";
import { CgProfile, CgMoreO } from "react-icons/cg";




const Home = () => {
    const fulltweet = {
        "data": [
            {
                "id": "1212092628029698048",
                "text": "We believe the best future version of our API will come from building it with YOU. Here’s to another great year with everyone who builds on the Twitter platform. We can’t wait to continue working with you in the new year. https://t.co/yvxdK6aOo2",
                "possibly_sensitive": false,
                "referenced_tweets": [
                    {
                        "type": "replied_to",
                        "id": "1212092627178287104"
                    }
                ],
                "entities": {
                    "urls": [
                        {
                            "start": 222,
                            "end": 245,
                            "url": "https://t.co/yvxdK6aOo2",
                            "expanded_url": "https://twitter.com/LovesNandos/status/1211797914437259264/photo/1",
                            "display_url": "pic.twitter.com/yvxdK6aOo2"
                        }
                    ],
                    "annotations": [
                        {
                            "start": 144,
                            "end": 150,
                            "probability": 0.626,
                            "type": "Product",
                            "normalized_text": "Twitter"
                        }
                    ]
                },
                "author_id": "2244994945",
                "public_metrics": {
                    "retweet_count": 8,
                    "reply_count": 2,
                    "like_count": 40,
                    "quote_count": 1
                },
                "lang": "en",
                "created_at": "2019-12-31T19:26:16.000Z",
                "source": "Twitter Web App",
                "in_reply_to_user_id": "2244994945",
                "attachments": {
                    "media_keys": [
                        "16_1211797899316740096"
                    ]
                },
                "context_annotations": [
                    {
                        "domain": {
                            "id": "119",
                            "name": "Holiday",
                            "description": "Holidays like Christmas or Halloween"
                        },
                        "entity": {
                            "id": "1186637514896920576",
                            "name": " New Years Eve"
                        }
                    },
                    {
                        "domain": {
                            "id": "119",
                            "name": "Holiday",
                            "description": "Holidays like Christmas or Halloween"
                        },
                        "entity": {
                            "id": "1206982436287963136",
                            "name": "Happy New Year: It’s finally 2020 everywhere!",
                            "description": "Catch fireworks and other celebrations as people across the globe enter the new year.\nPhoto via @GettyImages "
                        }
                    },
                    {
                        "domain": {
                            "id": "46",
                            "name": "Brand Category",
                            "description": "Categories within Brand Verticals that narrow down the scope of Brands"
                        },
                        "entity": {
                            "id": "781974596752842752",
                            "name": "Services"
                        }
                    },
                    {
                        "domain": {
                            "id": "47",
                            "name": "Brand",
                            "description": "Brands and Companies"
                        },
                        "entity": {
                            "id": "10045225402",
                            "name": "Twitter"
                        }
                    },
                    {
                        "domain": {
                            "id": "119",
                            "name": "Holiday",
                            "description": "Holidays like Christmas or Halloween"
                        },
                        "entity": {
                            "id": "1206982436287963136",
                            "name": "Happy New Year: It’s finally 2020 everywhere!",
                            "description": "Catch fireworks and other celebrations as people across the globe enter the new year.\nPhoto via @GettyImages "
                        }
                    }
                ]
            }
        ],
        "includes": {
            "tweets": [
                {
                    "possibly_sensitive": false,
                    "referenced_tweets": [
                        {
                            "type": "replied_to",
                            "id": "1212092626247110657"
                        }
                    ],
                    "text": "These launches would not be possible without the feedback you provided along the way, so THANK YOU to everyone who has contributed your time and ideas. Have more feedback? Let us know ⬇️ https://t.co/Vxp4UKnuJ9",
                    "entities": {
                        "urls": [
                            {
                                "start": 187,
                                "end": 210,
                                "url": "https://t.co/Vxp4UKnuJ9",
                                "expanded_url": "https://twitterdevfeedback.uservoice.com/forums/921790-twitter-developer-labs",
                                "display_url": "twitterdevfeedback.uservoice.com/forums/921790-…",
                                "images": [
                                    {
                                        "url": "https://pbs.twimg.com/news_img/1261301555787108354/9yR4UVsa?format=png&name=orig",
                                        "width": 100,
                                        "height": 100
                                    },
                                    {
                                        "url": "https://pbs.twimg.com/news_img/1261301555787108354/9yR4UVsa?format=png&name=150x150",
                                        "width": 100,
                                        "height": 100
                                    }
                                ],
                                "status": 200,
                                "title": "Twitter Developer Feedback",
                                "description": "Share your feedback for the Twitter developer platform",
                                "unwound_url": "https://twitterdevfeedback.uservoice.com/forums/921790-twitter-developer-labs"
                            }
                        ]
                    },
                    "author_id": "2244994945",
                    "public_metrics": {
                        "retweet_count": 3,
                        "reply_count": 1,
                        "like_count": 17,
                        "quote_count": 0
                    },
                    "lang": "en",
                    "created_at": "2019-12-31T19:26:16.000Z",
                    "source": "Twitter Web App",
                    "in_reply_to_user_id": "2244994945",
                    "id": "1212092627178287104"
                }
            ]
        }
    }
    const folders = [
        { lable: "Home", icon: <AiOutlineHome /> },
        { lable: "Explore", icon: <FaHashtag /> },
        { lable: "Notification", icon: <BsFillBellFill /> },
        { lable: "Messages", icon: <FiMail /> },
        { lable: "BookMark", icon: <BsBookmark /> },
        { lable: "List", icon: <RiFileListLine /> },
        { lable: "Profile", icon: <CgProfile /> },
        { lable: "More", icon: <CgMoreO /> }
    ]
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [totalCount, setTotalCount] = React.useState(0);
    const [newTwitterCount, setnewTwitterCount] = React.useState(0);
    const [searchString, setSearchString] = React.useState("");

    const toast = useToast();
    let [query, setQuery] = React.useState({
        limit: 25,
        page: 0,
        rules: []
    });

    const defineRules = () => {
        let rules = []
        let arr = searchString.split(" ")
        arr.forEach((e) => {
            rules.push({
                'value': `${e} has:images -is:retweet`,
                'tag': e
            })
        })
        query.rules = rules
        SearchTweets()
    }



    const dispatch = useDispatch()
    const tweets = useSelector((state) => state.allTweets.tweets)
    console.log("tweets.......", tweets)


    const loadMoreTweetsCounts = async () => {
        let token = localStorage.getItem("authToken")

        const response = await post(RestAPI.count, query, token)

        if (response.status) {
            setnewTwitterCount(response.notification)
            console.log("loadMoreTweets..notfication..", response.notification)
            if (response.notification >= 0 && response.totalCount > 0) {
                loadMoreApi()
            }

        }
    }
    const loadMoreApi = async () => {
        let token = localStorage.getItem("authToken")
        const response = await post(RestAPI.loadMore, query, token)
        if (response.status) {
            dispatch(searchTweets(response.tweets))
            setTotalCount(response.totalCount)
            console.log("loadMoreApi....", response.totalCount)
        }
    }
    const loadMoreTweets = async () => {
        let token = localStorage.getItem("authToken")
        setIsLoading(true)
        setIsSubmitting(true)
        const response = await post(RestAPI.loadMore, query, token)

        if (response.status) {
            setIsLoading(false)
            setIsSubmitting(false)
            dispatch(searchTweets(response.tweets))
            setTotalCount(response.totalCount)
            console.log("loadMoreTweets....", response.totalCount)
        } else {
            toast({
                title: "Error",
                description: "No Tweets....",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
        }
    }
    const delay = (time) => {
        return new Promise(function (resolve) {
            setTimeout(resolve, time)
        });
    }
    const SearchTweets = async () => {
        setIsLoading(true)
        setIsSubmitting(true)
        let token = localStorage.getItem("authToken")
        const res = await post(RestAPI.searchTweets, query, token)
        if (res.status) {
            if (res.tweets === 0 || res.totalCount === 0) {
                delay(30000)
                await loadMoreTweets()
            } else {
                setIsSubmitting(false)
                setIsLoading(false)
                dispatch(searchTweets(res.tweets))
                setTotalCount(res.totalCount)
            }

        } else {
            toast({
                title: "Error",
                description: "No Tweets....",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
        }
    }
    React.useEffect(() => {
        loadMoreTweets()

        setInterval(() => {
            loadMoreTweetsCounts()

        }, 15000)
    }, [])

    const loadMore = () => {
        query.page = query.page + 1;
        loadMoreTweets()
    }


    return (<Box p={4} justifyContent="center" h="100%" width="100%" >


        <Flex flexDirection="row">
            <Box width="15%" h="100%" bgColor="blackAlpha.100" alignItems="center" justifyContent="center"></Box>
            <Box width="15%" h="100%">
                <VStack spacing={4} top={10}>
                    <Image
                        borderRadius='full'
                        boxSize='75px'
                        src='https://help.twitter.com/content/dam/help-twitter/brand/logo.png'
                        alt='Twitter'

                    />
                    <Box width="100%">


                        {
                            folders.map((e, i) => (
                                <Box p={8} key={i} pt={2}>
                                    <HStack
                                        w="80%"
                                        cursor="pointer"
                                        spacing={2}
                                    >
                                        {e.icon}

                                        <Box>
                                            <Text
                                                textTransform="capitalize"
                                                fontFamily="body"
                                                color="black"
                                                fontSize="large"
                                                fontWeight="semibold"
                                            >
                                                {e.lable}
                                            </Text>
                                        </Box>

                                    </HStack>

                                </Box>


                            ))

                        }
                    </Box>
                </VStack>

            </Box>
            <Box width="40%" h="100%" bgColor="white" top={0}>
                <Box width="100%" h="100%">



                    <HStack spacing={0} top={0}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<Search2Icon />}
                            />
                            <Input
                                type="text"
                                placeholder="Serach something..."
                                focusBorderColor="cyan.400"
                                value={searchString}
                                onChange={e => setSearchString(e.target.value.trim())}
                            />
                        </InputGroup>
                        <Button
                            colorScheme="twitter"
                            letterSpacing={1.6}
                            onClick={() => { defineRules() }}
                            isLoading={isSubmitting}
                            isDisabled={isSubmitting}
                            border="1px"
                            borderRadius={25}
                        >
                            Search
                        </Button>

                        <Box color="twitter.700" pl={2}>
                            <HStack spacing={-2} cursor="pointer">
                                <Icon as={BsFillBellFill} w={6} h={6} color="twitter.700" />
                                <Badge ml='1' fontSize="10px" top={-5} colorScheme="twitter">
                                    {newTwitterCount}
                                </Badge>
                            </HStack>
                        </Box>
                    </HStack>

                    <Box pt={2} width="100%">
                        {
                            isLoading &&

                            <Center height="50vh">
                                <Spinner size="lg" color="blue.400" />
                            </Center>

                        }


                        <VStack spacing={1} width="100%">

                            {
                                tweets.map((ele, i) => (

                                    <Box key={i} width="100%" borderRadius="md" shadow="md" overflow="hidden" p={2}>
                                        <HStack spacing={1}>
                                            <Avatar size="md" name={ele.data?.author_id ? ele.data?.author_id : ele.data?.id} src={ele.data?.author_id ? ele.data?.author_id : ele.data?.id} />
                                            <Text fontWeight="semibold">{ele.data?.id}</Text>
                                            <Text fontWeight="semibold">{ele.data?.author_id}</Text>
                                        </HStack>
                                        <Box width="100%" >
                                            <Text dangerouslySetInnerHTML={{ __html: ele?.data?.text || "" }} />
                                        </Box>
                                        {
                                            ele?.includes?.tweets[0].urls.urls[0].url &&
                                            <Image
                                                boxSize="100%"
                                                src={ele?.includes?.tweets[0]?.urls?.urls[0]?.url}
                                                alt='Twitter'

                                            />
                                        }

                                        <Box width="100%" >
                                            <HStack spacing={0}>
                                                <Box w="10%"></Box>
                                                <Box p={4} w="20%"><HStack spacing={2}> <FaRegComment /><Text>{ele?.public_metrics?.reply_count}</Text></HStack></Box>
                                                <Box p={4} w="20%"><HStack spacing={2}> <AiOutlineRetweet /><Text>{ele?.public_metrics?.retweet_count}</Text></HStack></Box>
                                                <Box p={4} w="20%"><HStack spacing={2}> <AiOutlineHeart /><Text>{ele?.public_metrics?.like_count}</Text></HStack></Box>
                                                <Box p={4} w="20%" ><HStack spacing={2}> <BsUpload /><Text>{ele?.public_metrics?.quote_count}</Text></HStack></Box>
                                                <Box w="10%"></Box>
                                            </HStack>

                                        </Box>

                                        <Box>

                                        </Box>
                                    </Box>
                                ))
                            }

                            {
                                tweets.length >= 25 &&
                                <Button
                                    colorScheme="twitter"
                                    letterSpacing={1.6}
                                    onClick={() => { loadMore() }}
                                    isLoading={isSubmitting}
                                    isDisabled={isSubmitting}
                                    border="1px"
                                    borderRadius={25}
                                >
                                    Load More...
                                </Button>
                            }

                        </VStack>
                    </Box>
                </Box>
            </Box>
            <Box width="30%" h="100%" bgColor="blackAlpha.100"></Box>
        </Flex >
    </Box >)
}

export default Home